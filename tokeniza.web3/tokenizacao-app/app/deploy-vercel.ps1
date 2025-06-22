# Deploy para Produção - Tokenização Web3
Write-Host "🚀 Deploy para Produção - Tokenização Web3" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Limpar cache e node_modules
Write-Host "🧹 Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -eq 0) {
    # Verificar build local
    Write-Host "🔨 Testando build local..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build local bem-sucedido!" -ForegroundColor Green
        
        # Deploy para Vercel
        Write-Host "🚀 Fazendo deploy na Vercel..." -ForegroundColor Yellow
        vercel --prod --yes
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Deploy realizado com sucesso!" -ForegroundColor Green
            vercel ls
        } else {
            Write-Host "❌ Falha no deploy da Vercel" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Falha no build local" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Falha na instalação das dependências" -ForegroundColor Red
    exit 1
}
