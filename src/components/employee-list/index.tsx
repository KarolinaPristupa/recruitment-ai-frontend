import { UserAccountData } from '@/types/user-account-data';
import styles from './index.module.scss';
import EmployeeCard from '@components/employee-card';

interface EmployeeListProps {
  users: UserAccountData[];
  onSelect: (email: string) => void;
  onEdit: (email: string) => void;
  onDelete: (email: string) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ users, onSelect, onEdit, onDelete }) => {
  return (
    <div className={styles.list}>
      {users.map((user) => (
        <EmployeeCard
          key={user.email}
          user={user}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
