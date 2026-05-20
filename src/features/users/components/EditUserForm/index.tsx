import Button from "../../../../components/shared/Button"
import Input from "../../../../components/shared/Input"
import styles from "./EditUserForm.module.css"

export interface EditFormState {
  firstName: string
  lastName: string
  email: string
}

interface EditUserFormProps {
  form: EditFormState
  onChange: (form: EditFormState) => void
  onSave: () => void
  onCancel: () => void
}

function EditUserForm({ form, onChange, onSave, onCancel }: EditUserFormProps) {
  return (
    <div className={styles.form}>
      <Input
        label="First Name"
        value={form.firstName}
        onChange={(e) => onChange({ ...form, firstName: e.target.value })}
      />
      <Input
        label="Last Name"
        value={form.lastName}
        onChange={(e) => onChange({ ...form, lastName: e.target.value })}
      />
      <Input
        label="Email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
      />
      <div className={styles.actions}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default EditUserForm
