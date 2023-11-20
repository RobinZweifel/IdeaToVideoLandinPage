'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const generateFormSchema = z.object({
  url: z.string().min(1),
  prompt: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = ({
  
}: {
  imageUrl?: string;
  prompt?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [submittedURL] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      url: '',
      prompt: '',
    },
  });

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Generate a video</h1>

        </div>
        <div className="col-span-1">
          {submittedURL && (
            <>
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 sm:text-center text-left">
                Your QR Code
              </h1>
              <div>
                <div className="flex flex-col justify-center relative h-auto items-center">

                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
