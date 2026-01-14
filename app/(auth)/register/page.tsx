"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUp } from "@/lib/auth/actions";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("fullName", formData.fullName);
    formDataObj.append("role", formData.role);

    startTransition(async () => {
      const result = await signUp(formDataObj);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    });
  };

  if (success) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Success!</h1>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Account created successfully! Redirecting to login...
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-center text-gray-600">
          Join MedLedger to manage patient records
        </p>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-md">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I accept the terms and conditions and privacy policy
            </label>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
