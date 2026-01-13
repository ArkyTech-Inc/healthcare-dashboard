"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email) {
        setError("Please enter your email address")
        setIsLoading(false)
        return
      }

      // Mock password reset request - replace with actual Supabase
      setTimeout(() => {
        setIsSubmitted(true)
        setIsLoading(false)
      }, 500)
    } catch (err) {
      setError("Failed to send reset link. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-center text-gray-600">Enter your email to receive a password reset link</p>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-md">
        {isSubmitted ? (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">
                Password reset link sent! Check your email for further instructions.
              </AlertDescription>
            </Alert>
            <Link href="/login">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="text-blue-600 hover:text-blue-700">
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
