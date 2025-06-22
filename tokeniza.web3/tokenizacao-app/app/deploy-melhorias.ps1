# Script PowerShell para deploy das melhorias
Write-Host "🚀 Iniciando deploy para Vercel..." -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: package.json não encontrado. Execute este script na pasta do frontend." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow
npm ci --legacy-peer-deps

Write-Host "🔨 Fazendo build local..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build local bem-sucedido" -ForegroundColor Green
    Write-Host "🚀 Fazendo deploy na Vercel..." -ForegroundColor Cyan
    vercel --prod --yes
    Write-Host "✅ Deploy concluído!" -ForegroundColor Green
    Write-Host "🌐 Site disponível em: https://tokenizacao-web3.vercel.app" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erro no build local. Corrija os erros antes de fazer deploy." -ForegroundColor Red
    exit 1
}
