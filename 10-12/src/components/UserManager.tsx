import React, { useState } from 'react';
import { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, type User } from '../api/usersApi';

const UserManager: React.FC = () => {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [formData, setFormData] = useState({ name: '', email: '' });
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            await updateUser({ id: editingId, ...formData });
            setEditingId(null);
        } else {
            await addUser(formData);
        }

        setFormData({ name: '', email: '' });
    };

    const handleEditClick = (user: User) => {
        setEditingId(user.id);
        setFormData({ name: user.name, email: user.email });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ name: '', email: '' });
    };

    if (isLoading) return <div>Loading RTK Query data...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>RTK Query User Manager</h3>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5' }}>
                <h4>{editingId ? 'Редактировать пользователя' : 'Добавить нового пользователя'}</h4>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{ marginRight: '5px' }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        style={{ marginRight: '5px' }}
                    />
                    <button type="submit">{editingId ? 'Сохранить' : 'Добавить'}</button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '5px' }}>
                            Отмена
                        </button>
                    )}
                </div>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users?.map((user) => (
                    <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                        <span>
                            <strong>{user.name}</strong> ({user.email})
                        </span>
                        <button onClick={() => handleEditClick(user)}>Редактировать</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManager;