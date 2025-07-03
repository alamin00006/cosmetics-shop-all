import AdminUser from './admin.user.model'

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUserId = await AdminUser.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUserId?.id
}

export const generateAdminUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //if any user not exist then start from 00000
  // Increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementedId
}
