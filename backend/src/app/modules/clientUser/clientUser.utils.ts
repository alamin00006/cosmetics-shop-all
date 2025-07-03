import ClientUser from './clientUser.model'

const findLastClientUserId = async (): Promise<string | undefined> => {
  const lastClientUser = await ClientUser.findOne(
    { role: 'user' }, // Filtering users only
    { clientUserId: 1 }, // Selecting only clientUserId field
  )
    .sort({ createdAt: -1 })
    .lean()
  return lastClientUser?.clientUserId ? lastClientUser.clientUserId : undefined
}

export const generateClientUserId = async (): Promise<string> => {
  let currentId = '0001'

  const lastClientUserId = await findLastClientUserId()
  // console.log("Last Client ID:", lastClientUserId);

  if (lastClientUserId) {
    const lastIncrement = lastClientUserId.substring(3) // Extract last 4 digits (after CU-)
    currentId = (Number(lastIncrement) + 1).toString().padStart(4, '0') // Increment and format
  }

  return `CU-${currentId}`
}
