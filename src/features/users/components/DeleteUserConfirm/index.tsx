import Button from "../../../../components/shared/Button"
import type { User } from "../../../../api/types"
import styles from "./DeleteUserConfirm.module.css"

interface DeleteUserConfirmProps {
  user: User
  onConfirm: () => void
  onCancel: () => void
}

function DeleteUserConfirm({ user, onConfirm, onCancel }: DeleteUserConfirmProps) {
  return (
    <div>
      <p className={styles.confirmText}>
        Are you sure you want to delete{" "}
        <strong>{user.name.first} {user.name.last}</strong>?
      </p>
      <div className={styles.actions}>
        <Button onClick={onConfirm}>Yes, Delete</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default DeleteUserConfirm
