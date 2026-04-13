import logging
from typing import Optional
from enum import Enum

from app.services.metrics.base_metric import BaseMetric, MetricOutputBase
from app.services.metrics.frame_context import FrameContext
from app.services.metrics.eye_closure import EyeClosureMetricOutput
from app.services.metrics.yawn import YawnMetricOutput
from app.services.metrics.head_pose import HeadPoseMetricOutput
from app.services.metrics.phone_usage import PhoneUsageMetricOutput
from app.services.metrics.gaze import GazeMetricOutput

logger = logging.getLogger(__name__)

class DriverState(str, Enum):
    CALM = "calm"
    FATIGUE = "fatigue"
    SLEEPING = "sleeping"
    AGGRESSIVE = "aggressive"
    DISTRACTED = "distracted"

class DriverStateMetricOutput(MetricOutputBase):
    state: DriverState
    confidence: float

class DriverStateMetric(BaseMetric):
    """
    Aggregates multiple metrics to determine the overall driver state.
    """

    def __init__(self):
        self.last_head_pose: Optional[HeadPoseMetricOutput] = None
        self.head_pose_change_history = []
        self.MAX_HISTORY = 15 # frames

    def update_meta(self, 
                    metrics: dict,
                    ) -> DriverStateMetricOutput:
        """
        Special update method that takes other metric results.
        """
        eye_closure: Optional[EyeClosureMetricOutput] = metrics.get("eye_closure")
        yawn: Optional[YawnMetricOutput] = metrics.get("yawn")
        head_pose: Optional[HeadPoseMetricOutput] = metrics.get("head_pose")
        phone_usage: Optional[PhoneUsageMetricOutput] = metrics.get("phone_usage")
        gaze: Optional[GazeMetricOutput] = metrics.get("gaze")

        # 1. Check for Sleeping (highest priority)
        if eye_closure and eye_closure.get("eye_closed_sustained", 0) >= 1.0:
            return {"state": DriverState.SLEEPING, "confidence": 1.0}

        # 2. Check for Phone Usage / Distraction
        if phone_usage and phone_usage.get("phone_detected"):
            return {"state": DriverState.DISTRACTED, "confidence": 1.0}
        
        if gaze and gaze.get("distracted"):
            return {"state": DriverState.DISTRACTED, "confidence": 0.8}

        # 3. Check for Fatigue
        fatigue_score = 0.0
        if yawn and yawn.get("yawning"):
            fatigue_score += 0.5
        if eye_closure and eye_closure.get("perclos", 0) > 0.2:
            fatigue_score += 0.5
        
        if fatigue_score >= 0.5:
            return {"state": DriverState.FATIGUE, "confidence": min(fatigue_score, 1.0)}

        # 4. Check for Aggressive Driving (rapid head movements)
        if head_pose:
            if self.last_head_pose:
                # Calculate simple angular velocity-like metric
                diff = abs(head_pose["yaw"] - self.last_head_pose["yaw"]) + \
                       abs(head_pose["pitch"] - self.last_head_pose["pitch"]) + \
                       abs(head_pose["roll"] - self.last_head_pose["roll"])
                self.head_pose_change_history.append(diff)
                if len(self.head_pose_change_history) > self.MAX_HISTORY:
                    self.head_pose_change_history.pop(0)
                
                avg_change = sum(self.head_pose_change_history) / len(self.head_pose_change_history)
                # If moving head too much/quickly (threshold determined empirically)
                if avg_change > 15.0: 
                    return {"state": DriverState.AGGRESSIVE, "confidence": min(avg_change / 30.0, 1.0)}
            
            self.last_head_pose = head_pose

        # 5. Default to Calm
        return {"state": DriverState.CALM, "confidence": 1.0}

    def update(self, context: FrameContext) -> None:
        # This metric is updated via update_meta in MetricManager
        return None

    def reset(self):
        self.last_head_pose = None
        self.head_pose_change_history = []
