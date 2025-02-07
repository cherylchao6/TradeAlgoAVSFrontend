"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status?: "success" | "failed";
  title: string;
  message: string;
  buttonText?: string; // 自訂按鈕文字
}

export default function StatusModal({
  isOpen,
  onClose,
  status,
  title,
  message,
  buttonText = "Go back to dashboard", // 預設按鈕文字
}: StatusModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              {/* 狀態圖示 */}
              <div
                className={`mx-auto flex size-12 items-center justify-center rounded-full ${
                  status === "success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {status === "success" ? (
                  <CheckIcon
                    className="size-6 text-green-600"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircleIcon
                    className="size-6 text-red-600"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* 標題 & 訊息 */}
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>

            {/* 自訂按鈕 */}
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {buttonText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
