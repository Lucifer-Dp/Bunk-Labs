import { useState } from 'react'
import { colleges as initialColleges } from '../../data/dummyData'

const ManageColleges = () => {
  const [colleges, setColleges] = useState(initialColleges)
  const [isAdding, setIsAdding] = useState(false)
  const [newCollege, setNewCollege] = useState({ name: '', status: 'Active' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', status: '' })

  const handleStatusToggle = (id) => {
    setColleges(colleges.map(college => {
      if (college.id === id) {
        return {
          ...college,
          status: college.status === 'Active' ? 'Pending Approval' : 'Active'
        }
      }
      return college
    }))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      setColleges(colleges.filter(c => c.id !== id))
    }
  }

  const startEdit = (college) => {
    setEditingId(college.id)
    setEditForm({ name: college.name, status: college.status })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', status: '' })
  }

  const saveEdit = (id) => {
    setColleges(colleges.map(c => 
      c.id === id ? { ...c, ...editForm } : c
    ))
    setEditingId(null)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    const newId = Math.max(...colleges.map(c => c.id), 0) + 1
    const collegeToAdd = {
      id: newId,
      name: newCollege.name,
      students: 0,
      status: newCollege.status
    }
    setColleges([...colleges, collegeToAdd])
    setNewCollege({ name: '', status: 'Active' })
    setIsAdding(false)
    console.log('New College Added:', collegeToAdd)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🏫 Manage Colleges</h1>
          <p className="text-gray-600 mt-1">Review and manage registered institutions</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 font-medium"
        >
          {isAdding ? '❌ Cancel' : '➕ Add College'}
        </button>
      </div>

      {/* Add College Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 animate-fade-in">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Institution</h3>
          <form onSubmit={handleAddSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
              <input
                type="text"
                value={newCollege.name}
                onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g. State University of Technology"
                required
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newCollege.status}
                onChange={(e) => setNewCollege({ ...newCollege, status: e.target.value })}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-primary"
              >
                <option value="Active">Active</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 font-medium transition-colors"
            >
              Save College
            </button>
          </form>
        </div>
      )}

      {/* Colleges List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {colleges.map((college) => (
                <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{college.id}
                  </td>
                  
                  <td className="px-6 py-4">
                    {editingId === college.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full rounded border-gray-300 p-1 focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{college.name}</div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {college.students.toLocaleString()} 👨‍🎓
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === college.id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="rounded border-gray-300 p-1 text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending Approval">Pending Approval</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        college.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {college.status}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === college.id ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => saveEdit(college.id)} className="text-green-600 hover:text-green-900">💾 Save</button>
                        <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">❌ Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleStatusToggle(college.id)}
                          className={`text-xs px-2 py-1 rounded border ${
                            college.status === 'Active'
                              ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                              : 'border-green-500 text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {college.status === 'Active' ? '⏸️ Suspend' : '✅ Approve'}
                        </button>
                        <button onClick={() => startEdit(college)} className="text-blue-600 hover:text-blue-900">✏️ Edit</button>
                        <button onClick={() => handleDelete(college.id)} className="text-red-600 hover:text-red-900">🗑️ Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageColleges
