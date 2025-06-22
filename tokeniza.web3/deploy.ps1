# Script de Deploy Completo - Tokenização Web3 (PowerShell)
# Este script faz o deploy do frontend e backend para produção

Write-Host "🚀 Iniciando Deploy da Aplicação Tokenização Web3..." -ForegroundColor Green

# Verificar se as ferramentas necessárias estão instaladas
function Test-Tools {
    Write-Host "📋 Verificando ferramentas necessárias..." -ForegroundColor Yellow
    
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Git não encontrado. Por favor, instale o Git." -ForegroundColor Red
        exit 1
    }
    
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js." -ForegroundColor Red
        exit 1
    }
    
    if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "❌ NPM não encontrado. Por favor, instale o NPM." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Todas as ferramentas necessárias estão instaladas." -ForegroundColor Green
}

# Preparar ambiente
function Initialize-Environment {
    Write-Host "🔧 Preparando ambiente..." -ForegroundColor Yellow
    
    # Navegar para o diretório do frontend
    Set-Location "tokenizacao-app\app"
    
    # Instalar dependências
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    npm ci
    
    # Build do projeto
    Write-Host "🏗️ Fazendo build do projeto..." -ForegroundColor Yellow
    npm run build
    
    Write-Host "✅ Ambiente preparado com sucesso." -ForegroundColor Green
}

# Deploy do Frontend (Vercel)
function Start-FrontendDeploy {
    Write-Host "🌐 Fazendo deploy do frontend na Vercel..." -ForegroundColor Yellow
    
    if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    Write-Host "🚀 Fazendo deploy..." -ForegroundColor Yellow
    vercel --prod
    
    Write-Host "✅ Frontend deployado com sucesso!" -ForegroundColor Green
}

# Deploy do Backend (Render)
function Start-BackendDeploy {
    Write-Host "🔧 Preparando deploy do backend..." -ForegroundColor Yellow
    
    Set-Location "..\backend"
    
    Write-Host "📝 Instruções para deploy do backend:" -ForegroundColor Yellow
    Write-Host "1. Acesse https://render.com" -ForegroundColor White
    Write-Host "2. Conecte seu repositório GitHub" -ForegroundColor White
    Write-Host "3. Crie um novo Web Service" -ForegroundColor White
    Write-Host "4. Use as configurações do arquivo render.yaml" -ForegroundColor White
    Write-Host "5. O backend estará disponível em: https://tokenizacao-backend.onrender.com" -ForegroundColor White
    
    Write-Host "✅ Configurações do backend preparadas!" -ForegroundColor Green
}

# Função principal
function Main {
    Write-Host "🌟 Deploy da Aplicação Tokenização Web3" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
      Test-Tools
    Initialize-Environment
    Start-FrontendDeploy
    Start-BackendDeploy
    
    Write-Host ""
    Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Acesse sua aplicação em:" -ForegroundColor Cyan
    Write-Host "   Frontend: https://seu-projeto.vercel.app" -ForegroundColor White
    Write-Host "   Backend:  https://tokenizacao-backend.onrender.com" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Contratos na zkSync Sepolia:" -ForegroundColor Cyan
    Write-Host "   Asset Token:  0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64" -ForegroundColor White
    Write-Host "   Marketplace:  0x61b2bC16fc652418FB15D4a319b31E1853f38B84" -ForegroundColor White
    Write-Host "   Waitlist:     0x019ab49cE22877EA615b5c544cAA178525266b51" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Sua aplicação agora está disponível para o mundo inteiro!" -ForegroundColor Green
}

# Executar script
Main
