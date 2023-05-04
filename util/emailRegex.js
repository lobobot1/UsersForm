export default function emailCheck(mail) {
  const reg = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'g'
  )

  return reg.test(mail)
}
