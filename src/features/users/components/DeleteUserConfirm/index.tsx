import Button from "../../../../components/shared/Button"
import type { User } from "../../../../api/userApiTypes"
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
        <Button variant="danger" onClick={onConfirm}>Yes, Delete</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default DeleteUserConfirm
