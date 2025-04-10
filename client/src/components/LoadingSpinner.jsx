import React from 'react'
import { Loader } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
      <Loader className="w-10 h-10 animate-spin text-blue-500" />
      <p className="text-gray-600 text-sm">Loading, please wait...</p>
    </div>
  )
}
