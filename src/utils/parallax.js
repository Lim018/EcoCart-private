// Parallax effect utility functions

// Calculate the parallax transform value based on scroll position
export const calculateParallaxTransform = (scrollY, speed = 0.5) => {
  return `translateY(${scrollY * speed}px)`
}

// Apply parallax effect to an element
export const applyParallaxEffect = (element, scrollY, speed = 0.5) => {
  if (element) {
    element.style.transform = calculateParallaxTransform(scrollY, speed)
  }
}

// Initialize parallax effect for multiple elements
export const initParallaxEffects = (elements, speeds) => {
  const handleScroll = () => {
    const scrollY = window.scrollY
    elements.forEach((element, index) => {
      if (element) {
        const speed = speeds[index] || 0.5
        applyParallaxEffect(element, scrollY, speed)
      }
    })
  }

  window.addEventListener("scroll", handleScroll)

  // Return cleanup function
  return () => window.removeEventListener("scroll", handleScroll)
}
