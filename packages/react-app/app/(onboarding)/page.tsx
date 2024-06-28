import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-3">
            
            <h1>Onboarding</h1>
            <Link href="/home"><Button>Get Started</Button></Link>
        </main>
    )
}