"use client";

import { useActionState, useEffect, useRef } from "react";
import { Plus, Loader2 } from "lucide-react";
import { registrarEntrada, type EntradaState } from "@/app/sistema/estacionamento/actions";

const initial: EntradaState = { ok: false, error: "" };

export function EntradaForm() {
  const [state, action, pending] = useActionState(registrarEntrada, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <input
          name="placa"
          placeholder="Placa (ex: ABC-1234)"
          autoComplete="off"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase text-white outline-none placeholder:text-white/30 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
      <div className="sm:w-32">
        <input
          name="vaga"
          placeholder="Vaga"
          autoComplete="off"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase text-white outline-none placeholder:text-white/30 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />}
        Registrar entrada
      </button>

      {state.error && (
        <p className="w-full rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300 sm:order-last">
          {state.error}
        </p>
      )}
    </form>
  );
}
