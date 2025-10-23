window.addEventListener("scroll", () => {
  const navbar = document.getElementById("nav")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  const spans = navToggle.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = navToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 90
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(section)
})


window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero")
  const scrolled = window.pageYOffset
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + "px"
  }
})

function createHeroChart() {
  const canvas = document.getElementById("heroChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const width = (canvas.width = canvas.offsetWidth * 2)
  const height = (canvas.height = canvas.offsetHeight * 2)

  ctx.scale(2, 2)

  const data = [
    { x: 0, revenue: 30, efficiency: 25 },
    { x: 1, revenue: 35, efficiency: 30 },
    { x: 2, revenue: 45, efficiency: 40 },
    { x: 3, revenue: 55, efficiency: 50 },
    { x: 4, revenue: 70, efficiency: 65 },
    { x: 5, revenue: 90, efficiency: 85 },
    { x: 6, revenue: 100, efficiency: 95 },
  ]

  const padding = 20
  const chartWidth = width / 2 - padding * 2
  const chartHeight = height / 2 - padding * 2
  const maxValue = 100

  ctx.strokeStyle = "rgba(212, 175, 55, 0.1)"
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width / 2 - padding, y)
    ctx.stroke()
  }

  ctx.strokeStyle = "#d4af37"
  ctx.lineWidth = 3
  ctx.beginPath()
  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * point.x
    const y = padding + chartHeight - (point.revenue / maxValue) * chartHeight
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  ctx.fillStyle = "rgba(212, 175, 55, 0.1)"
  ctx.beginPath()
  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * point.x
    const y = padding + chartHeight - (point.revenue / maxValue) * chartHeight
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.lineTo(width / 2 - padding, padding + chartHeight)
  ctx.lineTo(padding, padding + chartHeight)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = "#60a5fa"
  ctx.lineWidth = 3
  ctx.beginPath()
  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * point.x
    const y = padding + chartHeight - (point.efficiency / maxValue) * chartHeight
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  data.forEach((point) => {
    const x = padding + (chartWidth / (data.length - 1)) * point.x
    const yRevenue = padding + chartHeight - (point.revenue / maxValue) * chartHeight
    const yEfficiency = padding + chartHeight - (point.efficiency / maxValue) * chartHeight

    ctx.fillStyle = "#d4af37"
    ctx.beginPath()
    ctx.arc(x, yRevenue, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#60a5fa"
    ctx.beginPath()
    ctx.arc(x, yEfficiency, 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

window.addEventListener("load", createHeroChart)
window.addEventListener("resize", createHeroChart)



function animateCounter(element, target, duration = 2000) {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated")
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const text = stat.textContent
          const number = Number.parseInt(text.replace(/\D/g, ""))
          if (number) {
            stat.textContent = "0"
            setTimeout(() => {
              animateCounter(stat, number, 2000)
              setTimeout(() => {
                if (text.includes("+")) {
                  stat.textContent = number + "+"
                } else if (text.includes("%")) {
                  stat.textContent = number + "%"
                }
              }, 2000)
            }, 200)
          }
        })
      }
    })
  },
  { threshold: 0.5 },
)

const heroStats = document.querySelector(".hero-stats")
if (heroStats) {
  statsObserver.observe(heroStats)
}

function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100

  let progressBar = document.getElementById("scrollProgress")
  if (!progressBar) {
    progressBar = document.createElement("div")
    progressBar.id = "scrollProgress"
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: linear-gradient(90deg, #d4af37, #60a5fa);
            z-index: 9999;
            transition: width 0.1s ease;
        `
    document.body.appendChild(progressBar)
  } else {
    progressBar.style.width = scrolled + "%"
  }
}

window.addEventListener("scroll", updateScrollProgress)

const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

const ctaButtons = document.querySelectorAll(".btn-primary")
ctaButtons.forEach((button) => {
  setInterval(() => {
    button.style.animation = "pulse 0.5s ease"
    setTimeout(() => {
      button.style.animation = ""
    }, 500)
  }, 5000)
})

const style = document.createElement("style")
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`
document.head.appendChild(style)

const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.removeAttribute("data-src")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => imageObserver.observe(img))

const testimonialCards = document.querySelectorAll(".testimonial-card")
testimonialCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const stars = this.querySelectorAll(".testimonial-rating svg")
    stars.forEach((star, index) => {
      setTimeout(() => {
        star.style.transform = "scale(1.2) rotate(15deg)"
        setTimeout(() => {
          star.style.transform = "scale(1) rotate(0deg)"
        }, 200)
      }, index * 50)
    })
  })
})

const featureCards = document.querySelectorAll(".feature-card")
const featureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 150)
        featureObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

featureCards.forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  featureObserver.observe(card)
})

function sendWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const numero = '+555194530318';

    const texto = ` *Novo Contato pelo Site*%0A%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Mensagem:* ${mensagem}`;

    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
  }



