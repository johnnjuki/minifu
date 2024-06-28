import { ConnectButton } from "@rainbow-me/rainbowkit"

export function Header() {
    return (
        <header className="hidden justify-end sm:flex p-4">
         
              <ConnectButton />
            
        </header>
    )
}