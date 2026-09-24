<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true }, // [{ id, image, title, subtitle }]
  intervalMs: { type: Number, default: 4500 }
})

const active = ref(0)
let timer = null

function go(i) {
  active.value = (i + props.slides.length) % props.slides.length
  restart()
}
function next() {
  go(active.value + 1)
}
function prev() {
  go(active.value - 1)
}
function restart() {
  clearInterval(timer)
  timer = setInterval(next, props.intervalMs)
}

onMounted(restart)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="relative w-full h-full overflow-hidden rounded-3xl group">
    <div
      class="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      :style="{ transform: `translateX(-${active * 100}%)` }"
    >
      <div v-for="slide in slides" :key="slide.id" class="w-full h-full shrink-0 relative">
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <p class="font-display text-2xl md:text-3xl font-semibold drop-shadow">{{ slide.title }}</p>
          <p class="text-sm md:text-base text-white/80 mt-1">{{ slide.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Arrows -->
    <button
      class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      @click="prev"
      aria-label="Previous slide"
    >â€¹</button>
    <button
      class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      @click="next"
      aria-label="Next slide"
    >â€º</button>

    <!-- Dots -->
    <div class="absolute top-4 right-4 flex gap-1.5">
      <button
        v-for="(s, i) in slides"
        :key="s.id"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="i === active ? 'w-6 bg-violet-400' : 'w-1.5 bg-white/50 hover:bg-white/80'"
        @click="go(i)"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>
  </div>

</template>
