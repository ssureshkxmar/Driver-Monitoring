'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';

export function TermsModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const hasAccepted = localStorage.getItem('elevium-terms-accepted');
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('elevium-terms-accepted', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden border-primary/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-6 pb-4 bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-wider text-primary">
              Hackathon Prototype
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">Terms & Conditions</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Please review the terms of use for the Elevium Hackathon Project.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Hackathon Disclaimer
              </h3>
              <p>
                Elevium is currently a prototype developed for a hackathon. It is intended for demonstration 
                and testing purposes only. The features provided are part of a conceptual framework 
                and may not represent a final, production-ready product.
              </p>
            </section>

            <section>
              <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Safety Warning
              </h3>
              <p>
                This application is a Driver Monitoring System (DMS) prototype. 
                <strong className="text-foreground mx-1">NEVER</strong> rely on this application to keep you safe while driving. 
                Always maintain full attention on the road. The creators of Elevium are not responsible for 
                any accidents or incidents occurring while using this software.
              </p>
            </section>

            <section>
              <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Data Privacy
              </h3>
              <p>
                As a hackathon entry, we prioritize your privacy. All video processing is performed 
                <span className="text-foreground font-medium mx-1">locally on your device</span>. 
                No video data or facial biometric signatures are uploaded to our servers 
                during the standard operation of this demonstration.
              </p>
            </section>

            <section>
              <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Intellectual Property
              </h3>
              <p>
                This project is open-source for the duration of the hackathon evaluation. 
                All rights to the unique algorithms and design language are reserved by the Elevium team.
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 bg-primary/5 border-t border-primary/10 flex flex-col sm:flex-row gap-3">
          <div className="text-[11px] text-muted-foreground flex-1 flex items-center italic mb-2 sm:mb-0">
            * By clicking accept, you acknowledge this is a prototype.
          </div>
          <Button 
            onClick={handleAccept} 
            className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 font-semibold"
          >
            I Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
