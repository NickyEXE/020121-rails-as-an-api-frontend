function sleep(time) {
  const start = new Date()
  while (new Date() - start < time) { }
}
