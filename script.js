async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("loggedIn", "true");
    //Redirect
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}

async function searchJobs() {
  let input = document.getElementById("search").value;

  if (input === "") return;

  const response = await fetch(
    `https://remotive.com/api/remote-jobs?search=${input}`
  );

  const data = await response.json();

  let jobList = document.getElementById("job-list");
  jobList.innerHTML = "";
  jobList.style.display = "block";

  data.jobs.slice(0, 5).forEach(job => {
    let div = document.createElement("div");
    div.className = "job";
    div.innerText = job.title;

    // 👇 Add click functionality
    div.onclick = () => {
      let choice = confirm("Open in LinkedIn? Click Cancel for Remotive");
      if (choice) {
        let query = encodeURIComponent(job.title);
        window.open(`https://www.linkedin.com/jobs/search/?keywords=${query}`, "_blank");
      } else {
        window.open(job.url, "_blank");
      }
    };
    
    jobList.appendChild(div);
  });
}
