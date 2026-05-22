import { useCallback, useMemo, useState } from "react"
import { dummySubmit } from "../../api/axiosInstance"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../components/shared/Toast"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { useUsers } from "../../hooks/useUsers"
import Table, { type Column } from "../../components/shared/Table"
import Drawer from "../../components/shared/Drawer"
import Modal from "../../components/shared/Modal"
import Pager from "../../components/shared/Pager"
import Badge from "../../components/shared/Badge"
import type { User } from "../../api/userApiTypes"
import EditUserForm from "../../features/users/components/EditUserForm"
import type { EditUserData } from "../../schemas/users/editUserSchema"
import DeleteUserConfirm from "../../features/users/components/DeleteUserConfirm"
import styles from "./UserManagementPage.module.css"

const PAGE_SIZE = 10
const MAX_RESULTS = 200

function UserManagementPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [page, setPage] = useState(1)
  const { data: pagedUsers = [], isLoading, isError } = useUsers(page, PAGE_SIZE)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const isActive = (u: User) => u.active !== undefined ? u.active : u.login.uuid[0] > "8"

  const openEdit = useCallback((user: User) => {
    setSelectedUser(user)
    setEditOpen(true)
    if (!isActive(user)) toast(`${user.name.first} ${user.name.last} is inactive.`, "warning")
  }, [toast])

  const openDelete = useCallback((user: User) => {
    setSelectedUser(user)
    setDeleteOpen(true)
  }, [])

  const closeEdit = useCallback(() => {
    setEditOpen(false)
    setSelectedUser(null)
  }, [])

  const closeDelete = useCallback(() => {
    setDeleteOpen(false)
    setSelectedUser(null)
  }, [])

  const handleSave = useCallback(async (data: EditUserData, pictureUrl: string) => {
    if (!selectedUser) return
    await dummySubmit({ firstName: data.firstName, lastName: data.lastName, email: data.email, active: data.active }, selectedUser.login.uuid)
    queryClient.setQueryData(["users", page], (old: User[]) =>
      old.map((u) =>
        u.login.uuid === selectedUser.login.uuid
          ? { ...u, name: { ...u.name, first: data.firstName, last: data.lastName }, email: data.email, active: data.active, picture: { ...u.picture, thumbnail: pictureUrl, medium: pictureUrl } }
          : u
      )
    )
    closeEdit()
    toast(`${data.firstName} ${data.lastName} was updated successfully.`, "success")
  }, [selectedUser, page, queryClient, closeEdit, toast])

  const handleDelete = useCallback(async () => {
    if (!selectedUser) return
    await dummySubmit({ firstName: selectedUser.name.first, lastName: selectedUser.name.last, email: selectedUser.email }, selectedUser.login.uuid)
    const name = `${selectedUser.name.first} ${selectedUser.name.last}`
    queryClient.setQueryData(["users", page], (old: User[]) =>
      old.filter((u) => u.login.uuid !== selectedUser.login.uuid)
    )
    closeDelete()
    toast(`${name} was removed from the list.`, "error")
  }, [selectedUser, page, queryClient, closeDelete, toast])

  const columns = useMemo<Column<User>[]>(() => [
    {
      key: "fullName",
      header: "Full Name",
      width: "20%",
      render: (u) => (
        <div className={styles.userCell}>
          <img className={styles.avatar} src={u.picture.thumbnail} alt={`${u.name.first} ${u.name.last}`} />
          <span className={styles.userName}>{u.name.first} {u.name.last}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", width: "28%", render: (u) => u.email },
    {
      key: "status",
      header: "Status",
      width: "110px",
      render: (u) => (
        <Badge variant={isActive(u) ? "success" : "danger"}>
          {isActive(u) ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "registered",
      header: "Joined Date",
      width: "130px",
      render: (u) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(u.registered.date)),
    },
    { key: "location", header: "Location", width: "130px", render: (u) => u.location.country },
    {
      key: "actions",
      header: "Actions",
      width: "90px",
      render: (u) => (
        <div className={styles.actions}>
          <button className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={() => openEdit(u)} aria-label="Edit user" title="Edit">
            <FiEdit2 size={16} />
          </button>
          <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={() => openDelete(u)} aria-label="Delete user" title="Delete">
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ], [openEdit, openDelete])

  if (isError) return <p>Failed to load users.</p>

  return (
    <div className={`stack ${styles.page}`}>
      <Table
        data={pagedUsers}
        columns={columns}
        rowKey={(u) => u.login.uuid}
        loading={isLoading}
        skeletonRows={PAGE_SIZE}
        footer={!isLoading ? <Pager page={page} total={MAX_RESULTS} pageSize={PAGE_SIZE} onChange={setPage} /> : undefined}
      />

      <Drawer isOpen={editOpen} onClose={closeEdit} title="Edit User">
        {selectedUser && (
          <EditUserForm
            key={selectedUser.login.uuid}
            defaultValues={{
              firstName: selectedUser.name.first,
              lastName: selectedUser.name.last,
              email: selectedUser.email,
              active: isActive(selectedUser),
            }}
            picture={selectedUser.picture.medium}
            onSave={handleSave}
            onCancel={closeEdit}
          />
        )}
      </Drawer>

      <Modal isOpen={deleteOpen} onClose={closeDelete} title="Delete User">
        {selectedUser && (
          <DeleteUserConfirm
            user={selectedUser}
            onConfirm={handleDelete}
            onCancel={closeDelete}
          />
        )}
      </Modal>
    </div>
  )
}

export default UserManagementPage
