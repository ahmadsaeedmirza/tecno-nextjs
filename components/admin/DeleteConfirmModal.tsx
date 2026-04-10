"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading = false,
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl p-0 overflow-hidden sm:max-w-[420px]">
        <div className="bg-white p-8">
          <AlertDialogHeader className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-2">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            
            <AlertDialogTitle className="text-2xl font-bold text-center text-slate-800">
              Confirm Deletion
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-center text-slate-500 text-base leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{itemName}"</span>? 
              <br />
              This action was irreversible and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-8">
            <AlertDialogCancel 
              onClick={onClose}
              className="flex-1 py-6 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-semibold"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              disabled={loading}
              className="flex-1 py-6 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-none transition-all font-bold shadow-lg shadow-red-200"
            >
              {loading ? "Deleting..." : "Delete Now"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
