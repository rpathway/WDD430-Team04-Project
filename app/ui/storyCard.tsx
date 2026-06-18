interface Story {
  _id: string;
  author: string;
  title: string;
  description: string;
  image: string;
  likes: number;
}


interface StoryCardProps {
  story: Story;
}


function StoryCard({ story }: StoryCardProps) {

  return (

    <div className="story-card">

      <img 
        src={story.image}
        alt={story.title}
      />

      <h2>
        {story.title}
      </h2>


      <p>
        {story.description}
      </p>


      <h4>
        By {story.author}
      </h4>


      <button>
        ❤️ {story.likes}
      </button>

    </div>

  );

}


export default StoryCard;