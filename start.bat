
@echo off
SET ModlueDIR=node_modules

if not exist %ModlueDIR% (
  npm install && npm run dev
) else ( 
  npm run dev
)