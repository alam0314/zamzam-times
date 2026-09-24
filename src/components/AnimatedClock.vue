<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 480 },
  tone: { type: String, default: 'dark' }, // 'dark' | 'light'
  ticking: { type: Boolean, default: true } // true = discrete per-second tick (realistic quartz movement)
})

// Real, live time — updated every second so the hands actually move like a
// working clock rather than a static illustration or looping CSS animation.
const now = ref(new Date())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))

const secDeg = computed(() => now.value.getSeconds() * 6)
const minDeg = computed(() => now.value.getMinutes() * 6 + now.value.getSeconds() * 0.1)
const hourDeg = computed(() => (now.value.getHours() % 12) * 30 + now.value.getMinutes() * 0.5)

const transitionStyle = computed(() =>
  props.ticking ? 'transition: transform 0.25s cubic-bezier(0.4, 2.2, 0.6, 1)' : 'transition: transform 1s linear'
)

const isLight = computed(() => props.tone === 'light')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 200 200"
    class="select-none pointer-events-none"
    aria-hidden="true"
  >
    <!-- Outer rim -->
    <circle
      cx="100" cy="100" r="96"
      :fill="isLight ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)'"
      :stroke="isLight ? 'rgba(20,22,31,0.12)' : 'rgba(212,167,63,0.35)'"
      stroke-width="1.5"
    />
    <circle
      cx="100" cy="100" r="88"
      fill="none"
      :stroke="isLight ? 'rgba(20,22,31,0.08)' : 'rgba(212,167,63,0.18)'"
      stroke-width="0.75"
    />

    <!-- Hour markers -->
    <g :stroke="isLight ? 'rgba(20,22,31,0.35)' : 'rgba(230,196,120,0.55)'" stroke-width="2" stroke-linecap="round">
      <line v-for="h in 12" :key="h"
        :transform="`rotate(${h * 30} 100 100)`"
        x1="100" y1="10" x2="100" :y2="h % 3 === 0 ? 20 : 15"
      />
    </g>
    <!-- Minute markers -->
    <g :stroke="isLight ? 'rgba(20,22,31,0.15)' : 'rgba(230,196,120,0.25)'" stroke-width="0.75">
      <line v-for="m in 60" :key="m"
        v-show="m % 5 !== 0"
        :transform="`rotate(${m * 6} 100 100)`"
        x1="100" y1="10" x2="100" y2="14"
      />
    </g>

    <!-- Hour hand -->
    <line
      x1="100" y1="100" x2="100" y2="55"
      :stroke="isLight ? '#20242F' : '#F5E8C2'"
      stroke-width="4.5" stroke-linecap="round"
      :transform="`rotate(${hourDeg} 100 100)`"
      :style="transitionStyle"
    />
    <!-- Minute hand -->
    <line
      x1="100" y1="100" x2="100" y2="30"
      :stroke="isLight ? '#20242F' : '#F5E8C2'"
      stroke-width="3" stroke-linecap="round"
      :transform="`rotate(${minDeg} 100 100)`"
      :style="transitionStyle"
    />
    <!-- Second hand -->
    <line
      x1="100" y1="112" x2="100" y2="22"
      :stroke="isLight ? '#C29A3B' : '#D4A73F'"
      stroke-width="1.25" stroke-linecap="round"
      :transform="`rotate(${secDeg} 100 100)`"
      :style="transitionStyle"
    />

    <!-- Center hub -->
    <circle cx="100" cy="100" r="4.5" :fill="isLight ? '#20242F' : '#D4A73F'" />
    <circle cx="100" cy="100" r="1.75" :fill="isLight ? '#fff' : '#20242F'" />
  </svg>

</template>
