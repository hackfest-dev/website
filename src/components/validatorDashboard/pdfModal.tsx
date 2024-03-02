import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
  import type { IdeaSubmission, Team } from "@prisma/client";
  import { Button } from "../ui/button";
  
  export default function PDFModal({
    team,
  }: {
    team: Team & { ideaSubmission: IdeaSubmission | null };
  }) {
    return (
      <div className="w-full">
        <Dialog>
          <DialogTrigger>
            <Button>View PDF</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{team.name}</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <iframe src={team.ideaSubmission?.pptUrl.split(';')[0]} width="100%" height="500px" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }