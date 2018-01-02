module.exports = async(msg) => {
  if (msg.channel.id !== "397763620307468298") return;
  if (msg.member.roles.some(r => r.name === "staff")) return;
  setTimeout(()=>{
    msg.delete()
  }, 10 * 1000)
}