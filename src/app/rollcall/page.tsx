import Student from '@/components/Student';
function page() {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-bgPrimary text-textSecondary w-xl h-2/4 rounded-4xl px-7 py-6 flex flex-col gap-4'>
        <div className="flex justify-between px-5">
          <div className='flex gap-5'>
            <div>...sınıf</div>
            <div>...şube</div>
          </div>
          <div>
            ...date
          </div>
        </div>
        <div className="w-full h-full border-2 border-bgSecondary rounded-2xl flex flex-col overflow-y-scroll p-2">
        {/* {list.map((item) => (
            <Student img={item.img} name={item.name} number={item.number}/>
          ))} */}
        </div>
        <div className='px-5'>...saveButton</div>
      </div>
    </main>
  )
}

export default page