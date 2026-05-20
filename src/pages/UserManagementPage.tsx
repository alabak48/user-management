import { useCallback, useMemo, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useUsers } from "../hooks/useUsers"
import Table, { type Column } from "../components/shared/Table"
import Drawer from "../components/shared/Drawer"
import Button from "../components/shared/Button"
import type { User } from "../api/types"
import EditUserForm, { type EditFormState } from "../features/users/components/EditUserForm"
import DeleteUserConfirm from "../features/users/components/DeleteUserConfirm"
import styles from "./UserManagementPage.module.css"

type DrawerMode = "edit" | "delete"

function UserManagementPage() {
  const queryClient = useQueryClient()
  const { data: users = [], isLoading, isError } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [drawerMode, setDrawerMode] = useState<DrawerMode | null>(null)
  const [editForm, setEditForm] = useState<EditFormState>({ firstName: "", lastName: "", email: "" })

  const openEditDrawer = useCallback((user: User) => {
    setSelectedUser(user)
    setDrawerMode("edit")
    setEditForm({ firstName: user.name.first, lastName: user.name.last, email: user.email })
  }, [])

  const openDeleteDrawer = useCallback((user: User) => {
    setSelectedUser(user)
    setDrawerMode("delete")
  }, [])

  const closeDrawer = useCallback(() => {
    setSelectedUser(null)
    setDrawerMode(null)
  }, [])

  const handleSave = useCallback(() => {
    if (!selectedUser) return
    queryClient.setQueryData(["users"], (old: User[]) =>
      old.map((u) =>
        u.login.uuid === selectedUser.login.uuid
          ? { ...u, name: { ...u.name, first: editForm.firstName, last: editForm.lastName }, email: editForm.email }
          : u
      )
    )
    closeDrawer()
  }, [selectedUser, editForm, queryClient, closeDrawer])

  const handleDelete = useCallback(() => {
    if (!selectedUser) return
    queryClient.setQueryData(["users"], (old: User[]) =>
      old.filter((u) => u.login.uuid !== selectedUser.login.uuid)
    )
    closeDrawer()
  }, [selectedUser, queryClient, closeDrawer])

  const columns = useMemo<Column<User>[]>(() => [
    {
      key: "fullName",
      header: "Full Name",
      render: (u) => (
        <div className={styles.userCell}>
          <img src={u.picture.thumbnail} alt={`${u.name.first} ${u.name.last}`} />
          <span>{u.name.first} {u.name.last}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", render: (u) => u.email },
    {
      key: "status",
      header: "Status",
      render: (u) => <span>{u.login.uuid[0] > "8" ? "Active" : "Inactive"}</span>,
    },
    { key: "registered", header: "Joined Date", render: (u) => u.registered.date },
    { key: "location", header: "Location", render: (u) => u.location.country },
    {
      key: "actions",
      header: "Action",
      render: (u) => (
        <div>
          <Button onClick={() => openEditDrawer(u)}>Edit</Button>
          <Button onClick={() => openDeleteDrawer(u)}>Delete</Button>
        </div>
      ),
    },
  ], [openEditDrawer, openDeleteDrawer])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load users.</p>

  return (
    <div>
      <Table data={users} columns={columns} rowKey={(u) => u.login.uuid} />
      <Drawer
        isOpen={drawerMode !== null}
        onClose={closeDrawer}
        title={drawerMode === "edit" ? "Edit User" : "Delete User"}
      >
        {drawerMode === "edit" ? (
          <EditUserForm
            form={editForm}
            onChange={setEditForm}
            onSave={handleSave}
            onCancel={closeDrawer}
          />
        ) : selectedUser ? (
          <DeleteUserConfirm
            user={selectedUser}
            onConfirm={handleDelete}
            onCancel={closeDrawer}
          />
        ) : null}
      </Drawer>
    </div>
  )
}

export default UserManagementPage
