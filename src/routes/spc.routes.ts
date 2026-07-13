import { FastifyInstance } from "fastify";

import {
  spc11Controller,
  spc240Controller,
  spc246Controller,
  spc257Controller,
  spc323Controller,
  spc325Controller,
  spc337Controller,
  spc454Controller,
  spc515Controller,
  spc626Controller,
  spc627Controller,
  spc628Controller,
  spc629Controller,
  spc630Controller,
  spc631Controller,
  spc632Controller,
  spc633Controller,
  spc668Controller,
  spc674Controller,
  spc675Controller,
  spc676Controller,
  spc677Controller,
  spc678Controller,
  spc695Controller,
  spc940Controller,
} from "@/controllers/spc";

export async function spcRoutes(server: FastifyInstance) {
  // credit/325 Verificar as verticais de produtos

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/11", spc11Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/240", spc240Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/246", spc246Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/257", spc257Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/323", spc323Controller);

  server.post<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/325-spc-maxi", spc325Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/337", spc337Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/454", spc454Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/515", spc515Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/626", spc626Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/627", spc627Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/628", spc628Controller);

  server.post<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/629-spc-positivo", spc629Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/630", spc630Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/631", spc631Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/632", spc632Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/633", spc633Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/668", spc668Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/674", spc674Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/675", spc675Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/676", spc676Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/677", spc677Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/678", spc678Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/695", spc695Controller);

  server.get<{
    Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[] };
  }>("/api/940", spc940Controller);
}
