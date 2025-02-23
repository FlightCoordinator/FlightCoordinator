"use client";

import React from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base-ui/dialog";

interface DeleteResourceProps {
  onClick: () => Promise<void>;
}

const DeleteResource = ({ onClick }: DeleteResourceProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>Are you sure you want to delete this item?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-sm">
            Before deleting this item, make sure to delete or disconnect any resources that reference it to prevent
            errors.
          </div>
          <div className="text-sm text-destructive">This action cannot be undone.</div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onClick}>
              <Trash2 />
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteResource;
