const ProjectVideos = ({ projectData }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 pt-3">
      <iframe
        className="w-full h-[250px]"
        src={`${projectData?.youtubeVideoLink}?rel=0`}
        title="HR Session | Rtemis Group"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ProjectVideos;
