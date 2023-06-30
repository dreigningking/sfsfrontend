import AppLayout from '@/layouts/AppLayout'
import { useState } from 'react';
import { Button, Input, Modal } from 'reactstrap'
// import { useDebounce } from 'use-debounce';
import { useGetUserQuery } from '../lib/redux/apis/endpoints/auth';
import Icon from '@mdi/react';
import { mdiDelete, mdiPlus } from '@mdi/js';
import { useStoreTaskMutation, useGetTasksQuery, useDeleteTaskMutation } from '../lib/redux/apis/endpoints/task';
import { useDispatch } from 'react-redux';
import { showLogin, showRegister } from '../lib/redux/slices/authModalSlice';
import Loader from '../components/Loader';
import { formatDate } from '../lib/util/date';

const Home = () => {

  const nullTask = {
    title: null,
    description: null
  }

  const [openModal, setOpenModal] = useState(false)
  const [activeTask, setActiveTask] = useState(nullTask)
  const [hasEditted, setHasEditted] = useState(false)

  const { data: user } = useGetUserQuery()
  const { data: tasks, isLoading } = useGetTasksQuery()
  const [storeTask, { isLoading: creatingTask }] = useStoreTaskMutation()
  const [deleteTask, { isLoading: deletingTask }] = useDeleteTaskMutation()

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (activeTask) useDebounce(null, 1000);
  // // TODO: Use Autosave instead of Save button
  // }, [activeTask])

  const requestClose = () => {
    if (hasEditted) return;

    setOpenModal(false)
    setHasEditted(false)
  }

  const handleSelectTask = async (task, isDeleteAction = false) => {
    setActiveTask(task);

    !isDeleteAction ?
      setOpenModal(true) :
      await deleteTask(task)
  }

  const handleValueChange = (event) => {
    const { name, value } = event.target;

    setActiveTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));

    setHasEditted(true)
  };

  const handleCreateOrEdit = async () => {
    if (!activeTask?.title) return;

    await storeTask({
      ...activeTask,
      action: (activeTask?.id ? 'update' : 'create')
    })
      .unwrap()
      .then(res => setHasEditted(false))
  }

  return (
    <AppLayout title={'Home'} >
      <div className="styled-icon rounded-end-4 bg-primary p-3 p-md-3"></div>

      <div className='container-fluid bg-white p-3 p-md-5 rounded-4'>
        <div className="d-flex justify-content-between align-items-center sticky top-0">
          <h2 className='m-0'>👋 Welcome</h2>
          {user &&
            <Button
              onClick={() => handleSelectTask(nullTask)}
              color='danger d-inline-flex gap-2'>
              <Icon
                path={mdiPlus}
                size={0.8}
                id='plus'
                title="Add Task" />
              {'New Task'}
            </Button>}
        </div>

        <div className='row mt-3 overflow-auto'>
          {!user ?
            <div className='p-5 text-center'>
              You need to
              <Button color='link' onClick={() => dispatch(showLogin())}>login</Button>
              or
              <Button color='link' onClick={() => dispatch(showRegister())}>register</Button>
            </div> :
            tasks?.map(task => {
              return (
                <div key={task.id} className='col-md-2 mb-3 mb-md-0'>
                  <div
                    className="card card-body">
                    <div
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => handleSelectTask(task)}>
                      <div className="d-flex justify-content-between">
                        <p className="h4 fs-6">{task.title}</p>
                      </div>
                      <p>{task.description}</p>
                    </div>
                    <div className="d-flex justify-content-between gap-2 align-items-center">
                      <p className='m-0'> {formatDate(task.created_at)} </p>
                      <Button
                        color='link p-0'
                        onClick={() => handleSelectTask(task, true)}
                        active={!deletingTask}
                        disabled={deletingTask}>
                        <Icon
                          path={mdiDelete}
                          size={1}
                          id='deleteTask'
                          color={'red'}
                          title="Delete Task" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          }
          {tasks?.length < 1 && <div className='text-center p-5'>No tasks yet</div>}
          {isLoading && <Loader />}
        </div>
      </div>

      <Modal isOpen={openModal} toggle={requestClose} centered>
        <div className="p-3 p-md-4">

          <div className="mb-3">
            <Input
              placeholder="Title"
              name="title"
              aria-label="Title"
              value={activeTask?.title}
              autoCapitalize="none"
              className='border-0 border-bottom rounded-0'
              onChange={handleValueChange}
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Description"
              name="description"
              aria-label="Description"
              value={activeTask?.description}
              autoCapitalize="none"
              rows={15}
              className="form-control "
              onChange={handleValueChange}></textarea>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-2">
            <p className="m-0 text-success">{creatingTask && "Saving..."}</p>
            <Button
              color='danger'
              onClick={handleCreateOrEdit}
              active={!creatingTask}
              disabled={creatingTask}>Save</Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}

export default Home
