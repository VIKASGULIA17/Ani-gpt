import { Button } from "./button";
import { Card } from "./card";
import { Separator } from "./separator";

export function Help({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <Card className="w-[95%] md:w-[800px] max-h-[90vh] md:max-h-none p-4 md:p-6 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Help Center</h2>
          <Button variant="ghost" onClick={onClose} className="absolute right-3 md:right-4 top-3 md:top-4">
            ✕
          </Button>
        </div>
        
        <Separator className="my-3 md:my-4" />

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] md:max-h-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm md:text-base">
                Welcome to our AI assistant! Here's how to get started:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <li>Start a new chat by clicking the "New Chat" button</li>
                <li>Type your question or request in the input box</li>
                <li>Press Enter or click the send button to get a response</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <li>Chat history tracking</li>
                <li>Code syntax highlighting</li>
                <li>Dark/Light mode support</li>
                <li>Mobile-responsive design</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Tips for Better Results</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <li>Be specific in your questions</li>
                <li>Provide context when needed</li>
                <li>Use code blocks for programming questions</li>
                <li>Check your chat history for past conversations</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                If you need additional assistance, please contact our support team at:
                <br />
                <a href="mailto:support@geminiclone.com" className="text-blue-500 hover:underline">
                  vikasgulia1706@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={onClose} className="w-full md:w-auto">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 