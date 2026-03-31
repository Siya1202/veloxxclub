import { useEffect, useState } from 'react'
import './PostLoginLanding.css'
import veloxxWordmark from './assets/veloxx_posters.png'
import loginBackground from './assets/WhatsApp Image 2026-03-25 at 12.43.06.jpeg'

const FULL_TEXT = 'what do you want to do today?'
const TYPING_SPEED = 100
const LOGO_ANIMATION_DURATION = 1000

export default function PostLoginLanding({ onSelectPage }) {
  const [displayedText, setDisplayedText] = useState('')
  const [shouldStartTyping, setShouldStartTyping] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShouldStartTyping(true)
    }, LOGO_ANIMATION_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!shouldStartTyping) {
      return undefined
    }

    let currentIndex = 0

    const intervalId = window.setInterval(() => {
      if (currentIndex <= FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIndex))
        currentIndex += 1
        return
      }

      setShowButtons(true)
      window.clearInterval(intervalId)
    }, TYPING_SPEED)

    return () => window.clearInterval(intervalId)
  }, [shouldStartTyping])

  return (
    <div
      className="post-login"
      style={{ '--post-login-bg-image': `url(${loginBackground})` }}
    >
      <div className="post-login__content">
        <img
          src={veloxxWordmark}
          alt="Veloxx Club"
          className="post-login__logo post-login__logo--animated"
        />

        <h1 className="post-login__prompt">
          {shouldStartTyping ? displayedText : ''}
          {shouldStartTyping && <span className="post-login__cursor" aria-hidden="true">|</span>}
        </h1>

        <div className={`post-login__actions ${showButtons ? 'post-login__actions--visible' : ''}`}>
          <button type="button" className="post-login__button" onClick={() => onSelectPage('members')}>
            Members
          </button>
          <button type="button" className="post-login__button" onClick={() => onSelectPage('events')}>
            Events
          </button>
        </div>
      </div>
    </div>
  )
}
