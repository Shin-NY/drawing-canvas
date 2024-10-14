const init = async () => {
  const main = document.getElementById('images');
  if (!main) return;

  const images = await fetch('/drawings').then((res) => res.json());
  images.forEach((image) => {
    main.insertAdjacentHTML(
      'beforeend',
      ` 
        <div style="width:600px; background-color:white; border-radius: 6px; text-align:center">
          <a style="text-decoration: none; color: white" href="${image.imageUrl}">
            <div
              style="
                padding: 10px;
                background-color: teal;
              "
            >
              그림 다운로드
            </div>
          </a>
          <div style="margin-top:2px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
            <img width=100%; style="object-fit: contain;" src="${image.imageUrl}"/>
          </div>
        </div>
        `,
    );
  });
};

window.onload = init;
