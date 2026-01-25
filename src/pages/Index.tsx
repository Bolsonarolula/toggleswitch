import { Menu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-serif max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-background">
        {/* Logo placeholder */}
        <div className="w-28 h-9 bg-foreground rounded-sm" />
        
        {/* Menu button */}
        <button className="flex items-center gap-2 text-foreground">
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-base font-normal">Menu</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-3 bg-background">
        {/* Card/Image placeholder */}
        <div className="w-full aspect-square bg-card rounded-[2rem] mb-4" />

        {/* Text content */}
        <div className="px-3 py-2">
          <p className="text-foreground text-base mb-1">
            Resgate Seu Dinheiro
          </p>
          
          <h1 className="text-foreground text-[1.75rem] leading-[1.2] font-normal mb-6">
            Resgate os fundos de sua conta através do fundo garantidor de crédito Will Bank.
          </h1>

          {/* CTA Button */}
          <button className="w-full py-4 bg-secondary text-foreground border-2 border-foreground rounded-full text-lg font-normal tracking-wide mb-6">
            INICIAR
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-14 bg-footer" />
    </div>
  );
};

export default Index;
