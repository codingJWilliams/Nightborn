module.exports = async(msg) => {
  if (msg.channel.id !== "397763620307468298") return;
  setTimeout(()=>{
    msg.delete()
  }, 10 * 1000)
}