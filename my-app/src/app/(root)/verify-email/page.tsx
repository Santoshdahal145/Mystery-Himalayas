"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    // TODO: Send OTP to backend for verification here
    toast.success("Email verified successfully!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify Your Email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Enter the 6-digit verification code sent to your email.
          </p>

          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Submit Button */}
          <Button className="w-full" onClick={handleVerify}>
            Verify
          </Button>

          <p className="text-center text-sm text-gray-600">
            Didn’t receive the code?{" "}
            <button
              className="font-medium text-blue-600 hover:underline"
              onClick={() => toast("Verification code resent!")}
            >
              Resend
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
