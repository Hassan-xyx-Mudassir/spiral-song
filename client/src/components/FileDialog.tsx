import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";

function FileDialog({
  open,
  onOpen,
  isLoading,
  handleDownload,
  pdfFileName,
  svgFileName,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download files</DialogTitle>
          <DialogDescription>
            Download your files once they're generated. Clicking anywhere
            outside will close this dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          {isLoading ? (
            <AnimatedShinyText className="my-4">
              Generating...
            </AnimatedShinyText>
          ) : (
            <div className="flex justify-center items-center flex-row gap-4">
              <Button onClick={() => handleDownload(svgFileName)}>
                Download SVG
              </Button>
              <Button onClick={() => handleDownload(pdfFileName)}>
                Download PDF
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FileDialog;
