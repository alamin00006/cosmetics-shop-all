import { ISuperAdmin } from './superAdmin.interface'
import SuperAdmin from './superAdmin.model'

const createSuperAdmin = async (
  superAdminData: ISuperAdmin,
): Promise<ISuperAdmin | null> => {
  const newSuperAdmin = new SuperAdmin({
    ...superAdminData,
  })

  const saveNewSuperAdmin = await newSuperAdmin.save()
  return saveNewSuperAdmin
}

export const SuperAdminService = {
  createSuperAdmin,
}
