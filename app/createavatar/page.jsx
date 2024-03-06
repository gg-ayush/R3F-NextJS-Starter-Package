import styles from './createavatar.module.css'

const CreateAvatar = () => {
  return (
    <div className={styles.text}>
      <div className='flex flex-col justify-center items-center h-screen bg-black'>
        <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
        <div className='flex'>
          <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4' route='/avatar'>
            Create Avatar
          </button>
          <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2' route='/avatar'>
            Edit Avatar
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateAvatar
