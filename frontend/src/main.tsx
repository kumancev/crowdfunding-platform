import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import '@rainbow-me/rainbowkit/styles.css'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// import { StateContextProvider } from './context';
import App from './App'
import './index.css'

const { chains, provider } = configureChains([bscTestnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'Crowdfunding platform',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: '#ffe600',
        accentColorForeground: 'black',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
      })}
      chains={chains}
    >
      <Router>
        {/* <StateContextProvider> */}
        <App />
        {/* </StateContextProvider> */}
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
)
