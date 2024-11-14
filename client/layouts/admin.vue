<template>
  <div class="admin bg-[#f8f8f8]">
    <Navigate />

    <main class="flex h-[calc(100vh-80px)]">
      <Sidebar />

      <div
        class="flex-1 h-full bg-white rounded-tl-2xl shadow-xl relative overflow-y-auto"
      >
        <slot></slot>
      </div>
    </main>
  </div>
</template>
